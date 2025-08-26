import React from 'react';

function Footer() {
  return (
    <footer className="bg-violet-900 text-white py-4 mt-10 text-center">
      <p>&copy; {new Date().getFullYear()} iTask. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
