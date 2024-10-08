'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	/*
    When not using debounce this function will get called for every key stroke and it will
    make a call to the db! This could be a big problem when in production and you have a lot of data! 
    A way to solve this is to use a debouncing technique
  */
	/*
    const handleSearch = (term: string) => {
      console.log(`Searching... ${term}`);

      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }

      replace(`${pathname}?${params.toString()}`);
    };
  */

	/*
    Here the useDebouncedCallback will run the code once the 300ms are up! 
    This limits calling the db for every stroke, but now after the user has finished typing
  */
	const handleSearch = useDebouncedCallback((term: string) => {
		console.log(`Searching... ${term}`);

		const params = new URLSearchParams(searchParams);

		params.set('page', '1');

		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className='relative flex flex-1 flex-shrink-0'>
			<label htmlFor='search' className='sr-only'>
				Search
			</label>
			<input
				className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
			<MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
		</div>
	);
}
