import { SVGProps } from 'react';

const TaskIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.85em" height="1.85em" viewBox="0 0 24 24" {...props}>
      <g fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 3a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zm0 10a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3H6zm10 0a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-2zm0-10a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2z"
          fill="#ff6b93"
        ></path>
      </g>
    </svg>
  );
};

export default TaskIcon;
