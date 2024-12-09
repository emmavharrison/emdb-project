"use client";

import * as React from "react";
// import Link from "next/link"

import { cn } from "@/app/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu";
import { LoginButton } from "./LoginButton";



const components: { title: string; href: string; description: string }[] = [
  {
    title: "Reviewed Movies",
    href: "/collections/reviewed-movies",
    description: "All the movies I have reviewed.",
  },
  {
    title: "To Watch",
    href: "/collections/to-watch",
    description: "Movies I want to watch.",
  },
  {
    title: "Ultimate Faves",
    href: "/collections/ultimate-faves",
    description: "The best of the best.",
  },
  {
    title: "Saved Collections",
    href: "/collections/saved",
    description: "Collections saved from other users.",
  },
  {
    title: "Recommended Films",
    href: "/collections/recommended",
    description: "Films recommended by friends.",
  },
  {
    title: "Pride & Prejudice Vibes",
    href: "/collections/pride-prejudice-vibes",
    description: "Austen would love this.",
  },
];

export const NavBar = () => {
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href="/">Home</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href="/friends">Friends</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <a href="/collections" className={navigationMenuTriggerStyle()}>
              Collections
            </a>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <LoginButton />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
