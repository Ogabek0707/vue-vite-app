import { mdiAccount, mdiBook, mdiAccountGroup, mdiCog, mdiDoorOpen } from '@mdi/js'
export const AdminMenu = [
      {
            path: '/Student',
            label: "Student",
            name: "Student",
            icon: mdiAccount
      },
      {
            path: '/courses',
            label: "Courses",
            name: "Courses",
            icon: mdiBook
      },
      {
            path: '/groups',
            label: "Group",
            name: "Group",
            icon: mdiAccountGroup
      },
      {
            path: '/rooms',
            label: "Rooms",
            name: "Rooms",
            icon: mdiDoorOpen
      },
      {
            path: '/profile',
            label: "Profile",
            name: "Profile",
            icon: mdiCog
      },
]