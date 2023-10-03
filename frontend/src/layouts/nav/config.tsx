const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
        <rect width="9" height="9" x="2" y="2" fill="currentColor" rx="1"></rect>
        <rect width="9" height="9" x="2" y="13" fill="currentColor" opacity=".5" rx="1"></rect>
        <rect width="9" height="9" x="13" y="2" fill="currentColor" opacity=".5" rx="1"></rect>
        <rect width="9" height="9" x="13" y="13" fill="currentColor" opacity=".5" rx="1"></rect>
      </svg>
    ),
  },
  {
    title: 'user',
    path: '/employee/list',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M17.998 8.064L6.003 8.11l-.277-3.325A3 3 0 0 1 8.17 1.482l.789-.143a17.031 17.031 0 0 1 6.086 0l.786.143a3 3 0 0 1 2.443 3.302Z"
        ></path>
        <path fill="currentColor" d="M6.009 8.109a5.994 5.994 0 0 0 11.984-.045Z" opacity=".25"></path>
        <path
          fill="currentColor"
          d="m17.198 13.385l-4.49 4.49a1 1 0 0 1-1.415 0l-4.491-4.49a9.945 9.945 0 0 0-4.736 7.44a1 1 0 0 0 .994 1.108h17.88a1 1 0 0 0 .994-1.108a9.945 9.945 0 0 0-4.736-7.44Z"
        ></path>
        <path
          fill="currentColor"
          d="M15.69 12.654a6.012 6.012 0 0 1-7.381 0a10.004 10.004 0 0 0-1.507.73l4.491 4.492a1 1 0 0 0 1.414 0l4.491-4.491a10.005 10.005 0 0 0-1.507-.731Z"
          opacity=".5"
        ></path>
      </svg>
    ),
  },
  {
    title: 'project',
    path: '/project/list',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="m17.737 14.622l-2.426 2.23a11.603 11.603 0 0 1-4.299 2.37l.644 3.004a1 1 0 0 0 1.469.661l3.905-2.202a3.035 3.035 0 0 0 1.375-3.304zM7.266 8.776l2.088-2.48l-2.604-.628a2.777 2.777 0 0 0-3.387 1.357l-2.2 3.9a1 1 0 0 0 .661 1.469l3.073.659a12.887 12.887 0 0 1 2.369-4.277zm9.468.04a1.5 1.5 0 1 0-1.5-1.5a1.5 1.5 0 0 0 1.5 1.5z"
        ></path>
        <path
          fill="currentColor"
          d="M22.601 2.062a1 1 0 0 0-.713-.713A11.249 11.249 0 0 0 10.47 4.972L7.266 8.776a12.936 12.936 0 0 0-2.924 6.71a1 1 0 0 0 .284.837l3.1 3.1a1 1 0 0 0 .708.293a.838.838 0 0 0 .086-.004a11.847 11.847 0 0 0 6.79-2.86l3.664-3.368A11.204 11.204 0 0 0 22.6 2.062Zm-5.867 6.754a1.5 1.5 0 1 1 1.5-1.5a1.5 1.5 0 0 1-1.5 1.5Z"
          opacity=".5"
        ></path>
      </svg>
    ),
  },
  {
    title: 'task',
    path: '/task/list',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M7 6a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v2a1 1 0 0 1-.999 1H7zm10 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v2a1 1 0 0 1-.999 1H17z"
          opacity=".5"
        ></path>
        <path
          fill="currentColor"
          d="M19 4h-1v1a1 1 0 0 1-2 0V4H8v1a1 1 0 0 1-2 0V4H5a3 3 0 0 0-3 3v2h20V7a3 3 0 0 0-3-3z"
        ></path>
        <circle cx="7" cy="13" r="1" fill="currentColor"></circle>
        <circle cx="7" cy="17" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="13" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="17" r="1" fill="currentColor"></circle>
        <circle cx="17" cy="13" r="1" fill="currentColor"></circle>
        <circle cx="17" cy="17" r="1" fill="currentColor"></circle>
        <path
          fill="currentColor"
          d="M2 9v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9H2zm5 9a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm5 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm5 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2z"
          opacity=".5"
        ></path>
      </svg>
    ),
  },
  {
    title: 'report',
    path: '/report/list',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
        <path fill="currentColor" d="M17 13H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2Z"></path>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-7.743 16.33l-1.964 1.963A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20ZM9 7h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2Zm6 10H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Zm2-4H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2Z"
          opacity=".5"
        ></path>
        <path
          fill="currentColor"
          d="M15 17H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zm0-8H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"
        ></path>
      </svg>
    ),
  },
];

export { navConfig };
