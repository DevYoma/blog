import Posts from "./components/Posts";
import ProfilePic from './components/ProfilePic'

// revalidate
export const revalidate = 86400; // 1 day in secs

// dynamic params config(applied already)

export default function Home() {
  return (
    <div className="mx-auto">
      <ProfilePic />
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          &apos;m <span className="font-bold">Yoma</span>
        </span>
      </p>      

      <Posts />
    </div>
  )
}
