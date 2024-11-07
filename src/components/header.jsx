import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox, Menu, X } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setShowSignUp(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link>
          <img src="/logo.png" className="h-12 sm:h-16" alt="Logo" />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-8 items-center">
          <SignedOut>
            <Button onClick={() => setShowSignIn(true)} variant="outline">
              Login
            </Button>
            {/* Uncomment Sign Up if needed */}
            {/* <Button onClick={() => setShowSignUp(true)} variant="outline">
              Sign Up
            </Button> */}
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: { avatarBox: "w-10 h-10" },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  href={"/my-jobs"}
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                />
                <UserButton.Link
                  href={"/saved-jobs"}
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden  absolute top-16 right-0 left-0 bg-gray-900 p-4 z-10 m-6 rounded-lg">
            <SignedOut>
              <Button
                onClick={() => {
                  setShowSignIn(true);
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                className="w-full mb-4"
              >
                Login
              </Button>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center justify-between p-2">
                <p className="gradient-title font-extrabold">Profile</p>
                <UserButton
                  appearance={{
                    elements: { avatarBox: "w-10 h-10" },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="My Jobs"
                      labelIcon={<BriefcaseBusiness size={15} />}
                      href="/my-jobs"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                    <UserButton.Link
                      label="Saved Jobs"
                      labelIcon={<Heart size={15} />}
                      href="/saved-job"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
              {user?.unsafeMetadata?.role === "recruiter" && (
                <Link to="/post-job">
                  <Button
                    variant="destructive"
                    className="w-full mb-4 rounded-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PenBox size={20} className="mr-2" />
                    Post a Job
                  </Button>
                </Link>
              )}
            </SignedIn>
          </div>
        )}
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}

      {/* Uncomment for SignUp Modal */}
      {/* {showSignUp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignUp
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )} */}
    </>
  );
};

export default Header;
