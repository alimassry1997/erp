import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
      title: 'Admins',
      path: '/',
      icon: <AiIcons.AiFillAccountBook />,
      cName: 'nav-text'
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: <IoIcons.IoIosPaper />,
      cName: 'nav-text'
    },
    {
      title: 'Projects',
      path: '/projects',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text'
    },
    {
      title: 'Teams',
      path: '/teams',
      icon: <IoIcons.IoMdPeople />,
      cName: 'nav-text'
    },
    {
      title: 'Employees',
      path: '/employees',
      icon: <FaIcons.FaEnvelopeOpenText />,
      cName: 'nav-text'
    },
    {
      title: 'KPIRoles',
      path: '/kpiroles',
      icon: <IoIcons.IoMdHelpCircle />,
      cName: 'nav-text'
    }
  ];