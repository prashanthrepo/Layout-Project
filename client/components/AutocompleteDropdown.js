import { Fragment, useCallback, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function AutocompleteDropdown({
  options,
  onChange,
  className,
  defaultValue,
}) {
  const [selected, setSelected] = useState(defaultValue);
  const [query, setQuery] = useState('');

  const filteredoptions =
    query === ''
      ? options
      : options.filter((lead) =>
          lead?.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const onChangeOption = useCallback(
    (val) => {
      selected?._id !== val?._id && setSelected(val);
      onChange(val);
    },
    [selected]
  );

  // useEffect(() => {
  //   onChangeOption(defaultValue);
  // }, [defaultValue]);

  return (
    <div className="relative">
      <Combobox value={selected} onChange={onChangeOption}>
        <div className="relative">
          <div className="">
            <Combobox.Input
              className={className}
              displayValue={(options) => options?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}>
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-0.5 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              {filteredoptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredoptions.map((lead) => (
                  <Combobox.Option
                    key={lead?._id}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      )
                    }
                    value={lead}>
                    {({ active, selected }) => (
                      <>
                        <span
                          className={classNames(
                            'block truncate',
                            selected && 'font-semibold'
                          )}>
                          {lead?.name}
                        </span>

                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-indigo-600'
                            )}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
