// Import the required dependencies and utilities
import React, { useEffect, useState, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartI from '../../../../public/image/card';
import NotificationsI from '../../../../public/image/notifications';
import { AppContext } from '@/components/context';
import { getPathNameFromUrl } from '@/components/utils/miscellaneous';


const Header = ({ header }) => {
  const { cart, setCart, isModalOpen, setIsModalOpen, formType, setFormType, user } = useContext( AppContext )
  const { headerMenuItems, siteDescription, siteLogoUrl, siteTitle } = header || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Переключаем состояние меню
  };

  const handleClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  const openModal = (type = 'login') => {
    setFormType(type);      // login или register
    setIsModalOpen(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }

  }, []);
  // if (!headerData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <header className="header-container">
      <div className="header-container-wrapper">
      <button className="burger-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
      </button>
       <Link href="/" legacyBehavior>
            <a className="header-logo-image">
              {
                siteLogoUrl ? (
                  <Image
                    src={siteLogoUrl}
                    alt={`${siteTitle} logo`}
                    width={86}
                    height={86}
                  />
                ) : null
              }
            </a>
				</Link>

      <nav ref={menuRef} className={`header-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {headerMenuItems?.length > 0 ? (
            headerMenuItems.map((item) => (
              // <li key={item.ID}>
              //   <a href={item.url}>{item.title}</a>
              // </li>
            <li key={item.ID}> 
              <Link legacyBehavior key={ item?.ID }
                href={ getPathNameFromUrl( item?.url ?? '' ) || '/' }>
                <a
                dangerouslySetInnerHTML={ { __html: item.title } }/>
              </Link>
            </li>
            ))
          ) : (
            <li>Меню пустое</li>
          )}
        </ul>
      </nav>
    </div>
    <div className="header-container-wrapper-right">
        {user?.username ? (
          <div className="user-info">
            <span>Здравствуйте, {user.username}</span>
          </div>
        ) : (
            <>
              <button className='btn-reset  btn-general' onClick={() => openModal('register')}>
                Регистрация
              </button>
              <button className='btn-reset btn-general' onClick={() => openModal('login')}>
                Войти
              </button>
            </>
          
        )}
          <Link href="/cart/" legacyBehavior>
            <a className='header-iconcs-wrapper'>
              <CartI />
              <span
									className="totalQty">{ cart?.totalQty ? `${ cart?.totalQty }` : '0' }</span>
            </a>
          </Link>
          <div className='header-iconcs-wrapper'>
            <NotificationsI />
          </div>
    </div>
    </header>
  );
};

export default Header;