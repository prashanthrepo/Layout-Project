import Logo from '@/components/ui/logo';

export default function AuthHeader() {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between pt-4 px-4 sm:px-6 lg:px-8">
        {/* <Logo /> */}
        <span className="text-4xl text-indigo-600 font-bold ml-2">Persqft</span>
      </div>
    </div>
  );
}
