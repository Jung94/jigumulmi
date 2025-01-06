export const adminMenus = [
  {
    value: 1, 
    name: '장소 관리', 
    icon: 'DashboardIcon', 
    path: 'admin/place',
    query: 'sort=1&page=1',
    subMenu: []
  },
  {
    value: 2, 
    name: '유저 관리', 
    icon: 'UsersIcon', 
    path: 'admin/member',
    query: 'page=1',
    subMenu: []
  },
  {
    value: 3, 
    name: '배너 관리', 
    icon: 'ProjectIcon', 
    path: 'admin/banner',
    query: '',
    subMenu: []
  },
  // {
  //   value: 3, 
  //   name: '라벨링', 
  //   icon: 'ProjectIcon', 
  //   path: 'admin/labeling',
  //   query: '',
  //   subMenu: [
  //     {
  //       value: 30, 
  //       name: '시즌/컨테이너', 
  //       path: 'admin/labeling/seasons', 
  //       query: 'searchFilter=1&keyword=&sort=1&page=1',
  //       subMenu: [
  //         {value: 300, name: '할당', path: '/assignment', query: null}, 
  //         {value: 301, name: '컨테이너', path: '/container', query: 'searchFilter=1&keyword=&sort=1&page=1', subMenu: [
  //           {value: 300, name: '할당', path: '/assignment', query: null}
  //         ]}, 
  //       ]
  //     }, 
  //     {value: 31, name: '프로젝트', path: 'admin/labeling/projects', query: 'searchFilter=1&keyword=&deadline=&grade=0&sort=1&page=1'}, 
  //     {value: 32, name: '정산', path: 'admin/labeling/invoice', query: 'searchFilter=1&keyword=&status=0&sort=1&page=1'}, 
  //   ]
  // },
]