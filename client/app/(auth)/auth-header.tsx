import Logo from '@/components/ui/logo'

export default function AuthHeader() {
  return (
    <div className="flex">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Logo />
        <span className="text-3xl text-indigo-600 dark:text-slate-100 font-bold">
          1sqft
        </span>
      </div>
    </div>
  );
}
