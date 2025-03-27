import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Copy, SquareArrowOutUpRight, X } from "lucide-react";

export const PopupSiteLive = ({
  isOpen,
  onClose,
  websiteUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  websiteUrl: string;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogTitle asChild>
        <span className="sr-only">Site Live</span>
      </DialogTitle>
      <DialogContent className="sm:max-w-md p-0 gap-0 border-none h-[280px] md:w-[500px]">
        <div className="relative bg-white rounded-lg shadow-lg">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-6 flex flex-col items-center justify-center h-full gap-5">
            {/* Site live icon */}
            <img
              src="/site-live.svg"
              alt="Site Live Icon"
              className="h-[41px] w-[52px]"
            />

            <h3 className="text-2xl font-medium text-design-black mb-1 font-sans">
              Your website is now live!
            </h3>

            <div className="flex w-full flex-col md:flex-row gap-4 md:gap-2">
              <div className="flex-grow bg-gray-100 rounded-md border border-gray-300 p-2 px-3 text-sm text-gray-700 min-h-10">
                {websiteUrl}
              </div>
              <div className="grid grid-cols-2 md:flex md:flex-row gap-2.5 md:gap-2">
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-design-black hover:bg-gray-800 p-2 text-white rounded-md flex flex-row gap-2 items-center justify-center"
                >
                  <SquareArrowOutUpRight className="h-5 w-5" />
                  <span className="md:hidden text-white">Copy URL</span>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(websiteUrl);
                  }}
                  className="bg-design-black rounded-md hover:bg-gray-800 p-2 text-white flex flex-row gap-2 items-center justify-center"
                  title="Copy URL"
                >
                  <Copy className="h-5 w-5" />
                  <span className="md:hidden text-white">Visit Site</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
