'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { IFoodStat, IStats } from './types/index';
import { cn } from '@/lib/utils';
import 'ldrs/ring';
import 'ldrs/grid'; // Import the l-grid package
import { grid } from 'ldrs';
grid.register();
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem as RadixCommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRouter } from 'next/navigation';

const CommandItem = React.forwardRef<
  React.ElementRef<typeof RadixCommandItem>,
  React.ComponentPropsWithoutRef<typeof RadixCommandItem>
>(({ className, ...props }, ref) => (
  <RadixCommandItem
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  />
));

CommandItem.displayName = RadixCommandItem.displayName;

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [foods, setFoods] = React.useState<IFoodStat[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const router = useRouter();

  const fetchFoods = async () => {
    try {
      console.log('Fetching foods...');
      const response = await fetch('/api/foods/all');
      const data = await response.json();
      const foodsReduced: IFoodStat[] = data.map((food: IStats) => ({
        id: food.id,
        value: food.name.toLowerCase().replace(/ /g, '-'),
        label: food.name,
      }));
      setFoods(foodsReduced);
      console.log('Foods fetched successfully');
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchFoods();
  }, []);

  React.useEffect(() => {
    if (value.length > 0) {
      router.push(`/food/${value}`);
    }
  }, [value, router]);

  return (
    <>
      {!isLoading ? (
        <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6'>
          <h1 className='text-5xl text-center font-extrabold mb-4'>
            Welcome to <span className='title_colored'>StatsCenter</span>
          </h1>
          <p className='text-lg mb-8 text-center max-w-2xl'>
            Découvre les statistiques de tes joueuses préférées, à Mondeville, Duke, Rhode Island, ESBVA ou même Fenerbahce
          </p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-[300px] justify-between text-black bg-white dark:text-white dark:bg-gray-800 border-gray-700 z-10'
              >
                {value
                  ? foods.find((food) => food.value === value)?.label
                  : 'Select Player...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[300px] p-0 bg-gray-800 text-white z-20'>
              <Command>
                <CommandInput
                  placeholder='Search player...'
                  className='placeholder-gray-400 text-gray-300'
                />
                <CommandEmpty>No player found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {foods.map((food) => (
                      <CommandItem
                        key={food.id}
                        onClick={() => {
                          console.log('Selected food:', food.value);
                          setValue(food.value);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === food.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {food.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className='flex justify-center items-center h-screen bg-gray-900 text-white'>
          <l-grid size="60" speed="1.5" color="rgb(29, 128, 221)"></l-grid>
        </div>
      )}
    </>
  );
}
