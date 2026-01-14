import { Link, useLocation } from '@tanstack/react-router'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react'
import { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'

interface NavItem {
  label: string
  to: string
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
]

export function NavBar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 639px)', false, {
    getInitialValueInEffect: true,
  })

  return (
    <Navbar
      isBordered
      isBlurred
      onMenuOpenChange={setIsMenuOpen}
      className="sticky top-0 z-50"
    >
      <NavbarContent>
        {isMobile && (
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        )}
        <NavbarBrand>
          <Link to="/" className="font-bold text-inherit">
            HeroUI Components
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {!isMobile && (
        <NavbarContent className="gap-4" justify="center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <NavbarItem key={item.to} isActive={isActive}>
                <Link
                  to={item.to}
                  className={
                    isActive ? 'text-primary font-semibold' : 'text-default-600'
                  }
                >
                  {item.label}
                </Link>
              </NavbarItem>
            )
          })}
        </NavbarContent>
      )}

      <NavbarMenu>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to
          return (
            <NavbarMenuItem key={`${item.to}-${index}`} isActive={isActive}>
              <Link
                to={item.to}
                className={
                  isActive ? 'text-primary font-semibold' : 'text-default-600'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </Navbar>
  )
}
