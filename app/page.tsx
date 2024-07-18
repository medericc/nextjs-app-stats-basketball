"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 import { IFoodStat, IStats} from "./types/index"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"
 

export default function Home() {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [foods,setFoods] = React.useState<IFoodStat[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

// fetchdonnée en format json puis IFoodStat puis je le map en format IFOOD
// l'envoie a food apr son setter
// set loadig false car fin d envoei des donnes
// sinon fin d envoei et errreur

const rooter = useRouter();
  const fetchFoods = async () => {
    try {
      console.log("yes");
      const response = await fetch('/api/foods/all');
      const data = await response.json();
      const foodsReduced: IFoodStat[] = data.map((food: IStats) => ({
        value: food.name.toLowerCase().replace(/ /g, '-'),
        label: food.name
      }));
      setFoods(foodsReduced);
      console.log("yes");
      
    } catch (error) {
      console.log(error);
      console.log("non");
      
    }
  };

  // quand c good appelle le composant
React.useEffect(()=>{
const init = async() =>{
  console.log("yes");
  await fetchFoods();
  setIsLoading(false);
}
  init();

},[])

// changerz url selon le clic
React.useEffect(()=>{
  if(value.length > 0) {
    console.log("yes");
    rooter.push(`/food/${value}`)
  }
  
  },[value, rooter])
  
  


  // combobox pour choix multriplke copié collé shacid/ui
  return (
    // LOADER SI PAS ENCORE CHARGER
    <>
   
     {!isLoading ? (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to <span className="title_colored">StatsCenter</span>
          </h1>
          <p className="text-lg mb-8 text-center max-w-2xl">
            Découvre les statistiques de tes joueuses préférées, à Mondeville, Duke, Rhode Island, ESBVA ou même Fenerbahce
          </p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between text-black bg-white dark:text-white dark:bg-gray-800 border-gray-700"
              >
                {value
                  ? foods.find((food) => food.value === value)?.label
                  : "Select Player..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-gray-800 text-white">
              <Command />
              <CommandInput
                placeholder="Search food..."
                className="placeholder-gray-400 text-gray-300"
              />
              <CommandEmpty>No food found.</CommandEmpty>
              <CommandList>
              {foods.length > 0 && (
               
                <CommandGroup>
                  {foods.map((food) => (
                    <CommandItem
                      key={food.value}
                      value={food.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === food.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {food.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
             )} </CommandList>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </>
  );
}
