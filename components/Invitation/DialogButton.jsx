import { RxRocket } from 'react-icons/rx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DialogButtons = () => (
  <div className="flex w-5/6 items-center justify-between">
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-[#71717A]">
          Skip
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-[462px] sm:w-auto">
        <DialogHeader>
          <DialogTitle>
            If you skip setup, you will be unable to fetch data
          </DialogTitle>
          <DialogDescription>
            You will be able to continue your GitHub authorization from
            account settings later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex w-full items-center gap-2 sm:justify-between">
          <DialogClose className="rounded-md bg-[#71717A] px-4 py-2 text-white">
            Go Back
          </DialogClose>
          <Button variant="default">Add Later</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Next</Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-60 items-center gap-2 text-xl font-medium sm:w-auto">
        <RxRocket /> Fetching data...
      </DialogContent>
    </Dialog>
  </div>
);

export default DialogButtons;