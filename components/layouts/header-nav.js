import React from 'react';
import LogOutButton from './logout-button';

export default function HeaderNav() {
  return (
    <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow">
      <span className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        Logo
      </span>
      <LogOutButton />
    </nav>
  );
}
