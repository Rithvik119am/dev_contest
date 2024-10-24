import { SelectToolComponent } from "../components/SelectToolComponent";
import DonationDialog from "../components/DonationDialog";

export default function Home() {
  return (
    <div className=" pt-2 flex justify-center flex-col text-white pb-10">
      <main className="flex flex-col justify-center items-center mx-4 md:mx-40 rounded-lg">
        <SelectToolComponent />
      </main>
    </div>
  );
}
