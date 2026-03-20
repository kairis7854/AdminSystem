import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group flex justify-center"
      position="top-center"
      duration={3000}
      icons={{
        success: <CircleCheckIcon className="size-[16px] text-[#52c41a]" />,
        info: <InfoIcon className="size-[16px] text-[#1677ff]" />,
        warning: <TriangleAlertIcon className="size-[16px] text-[#faad14]" />,
        error: <OctagonXIcon className="size-[16px] text-[#ff4d4f]" />,
        loading: <Loader2Icon className="size-[16px] animate-spin text-[#1677ff]" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        }
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-white !text-[rgba(0,0,0,0.88)] !border-none " +
            "!shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12)] " +
            "!rounded-[8px] !py-[10px] !px-[16px] !w-auto !min-w-[150px] " +
            "!flex !items-center !gap-[8px] !mx-auto",
          title: "!text-[14px] !font-normal",
          icon: "!static !m-0 !w-[16px] !h-[16px]",
          success: "!text-[#52c41a]",
          error: "!text-[#ff4d4f]",
          info: "!text-[#1677ff]",
        },
      }}
      {...props} />
  );
}

export { Toaster }
