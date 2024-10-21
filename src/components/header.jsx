import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showSignIn, setShowsignIn] = useState(false);

  const [search, setSearch] = useSearchParams()
  const {user} = useUser()

  useEffect(() => {
    if(search.get("sign-in")){
      setShowsignIn(true)
    }
  },[search])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowsignIn(false)
      setSearch({})
    }
  }
  return (
    <>
      <nav className="py-4 flex justify-between items-center mx-auto max-w-7xl px-5">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="hirrd logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowsignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {/* add condition here that this  button is for recruiter */}
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button className="rounded-full" variant="destructive">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="flex fixed inset-0 items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
