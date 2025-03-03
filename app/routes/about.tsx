import { Link } from "@remix-run/react";
import { SiXing as Xing } from "@icons-pack/react-simple-icons";

export default function About() {
  return (
    <>
      <div className="w-full mt-5 text-gray-900 dark:text-gray-200">
        <h2 className="text-3xl text-center md:text-left md:text-4xl font-bold text-emerald-500 pb-4">
          About Me
        </h2>
      </div>
      <p className="md:text-xl text-lg font-medium leading-relaxed md:leading-relaxed">
        Hello, I&apos;m Marcel, 29-year-old from Germany, living in the Ruhr
        area. I discovered my passion for motorsport and music at an early age.
        For many years, I worked at a karting track, where I was able to turn my
        enthusiasm for motorsport into a profession. In addition, I used to be a
        drummer in a local metal band and played the trumpet in a big band.
      </p>
      <p className="md:text-xl text-lg font-medium py-4 md:leading-relaxed">
        My interest in development began when I was about 14 years old, when I
        created my first website with a website builder. Curious about how the
        whole thing works, I expanded my knowledge and acquired further skills
        in web development over the years.
      </p>
      <p className="md:text-xl text-lg font-medium md:leading-relaxed">
        Today, my focus is on creating user-friendly digital experiences through
        clean code and appealing design. I am always on the lookout for new
        technologies and projects that challenge and expand my skills.
      </p>
      <Link to="https://www.xing.com/profile/Marcel_Bialas2" className="my-12">
        <button className="flex items-center justify-center bg-gray-200 text-gray-900 rounded-2xl py-3 px-6 font-bold md:text-md gap-3 mt-6 md:mb-6 mb-16 hover:bg-emerald-500 transition-all duration-300">
          <Xing />
          View CV on Xing
        </button>
      </Link>
    </>
  );
}
