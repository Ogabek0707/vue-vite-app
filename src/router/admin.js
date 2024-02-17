export default {
      path: '/admin',
      name: 'admin',
      component: import("../views/admin/Admin.vue"),
      children: [
            {
                  path: '/Student',
                  name: 'Student',
                  component : import("../views/admin/Students.vue")
            },
            {
                  path: '/courses',
                  name: 'Courses',
                  component : import("../views/admin/Courses.vue")
            },
            {
                  path: '/groups',
                  name: 'Groups',
                  component : import("../views/admin/Groups.vue")
            },
            {
                  path: '/rooms',
                  name: 'Rooms',
                  component : import("../views/admin/Rooms.vue")
            },
            {
                  path: '/profile',
                  name: 'Profile',
                  component : import("../views/admin/Profile.vue")
            },
      ]
}