'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'


const Nav = () => {

  const {data:session} = useSession();
  const [toggleDropdown, settoggleDropdown] = useState(false)
  const [providers,setProviders] = useState(null);

  useEffect(() =>{
    const setUpProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    }

    setUpProviders();
  },[])
  return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="logo"
					width={30}
					height={30}
					className="object-contain"
				/>
				<p className="logo-text">Promptopia</p>
			</Link>
			{/* {alert(session?.user)} */}
			{/* desktop navigation */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							create post
						</Link>
						<button
							type="button"
							onClick={signOut}
							className="outline_btn"
						>
							sign out
						</button>

						<Link href="/profile">
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className="rounded-full"
								alt="profile"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* mobile navigation */}

			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							className="rounded-full"
							alt="profile"
							onClick={() => {
								settoggleDropdown((prev) => !prev);
							}}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => {
										settoggleDropdown(false);
									}}
								>
									My profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => {
										settoggleDropdown(false);
									}}
								>
									create prompt
								</Link>
                <button 
                type='button'
                onClick={()=>{
                  settoggleDropdown(false);
                  signOut();
                }}
                className='mt-5 w-full black_btn'
                >
                  sign out
                </button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
  );
}

export default Nav
