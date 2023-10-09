import { Switch } from '@headlessui/react';
import { FC, PropsWithChildren, useState } from 'react';

const HomeTemplate: FC<PropsWithChildren> = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-xl font-bold ">
        Tailwind Headless UI{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Switch (Toggle)
        </span>
      </h1>
      <h2 className="font-customize text-status-orange">Text</h2>
      <div className="ml-28">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default HomeTemplate;
