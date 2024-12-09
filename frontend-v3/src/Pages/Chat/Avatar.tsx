import * as AvatarRadix from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

type Size = "sm" | "md" | "lg";


type Props = {
  imgSrc?: string;
  name: string;
  size: Size;
  className?: string;
  orientation: string;
};

//TODO: fix providers avatar url

export default function Avatar({
  imgSrc = "",
  name,
  size = "md",
  className = "",
  orientation
}: Props) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>

          <div className={`${className}`}>
            <AvatarRadix.Root
              className={`${getSizeStyle(
                size
              )} bg-gray-700 inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle`}
            >

              <AvatarRadix.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={imgSrc}
                alt={name}
              />

              <AvatarRadix.Fallback
                className={`leading-1 flex h-full w-full items-center justify-center  font-medium`}
              >
                {getAcronym(name)}
              </AvatarRadix.Fallback>
            </AvatarRadix.Root>
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent bg-slate-600 border border-gray-700 text-white rounded-md p-1"
            side={orientation === "left" ? "left" : "right"}
            align="center"
            sideOffset={10}>
            {name}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>

  );
}

const getSizeStyle = (size: Size) => {
  switch (size) {
    case "sm":
      return "h-[30px] w-[30px] text-[14px]";
    case "md":
      return "h-[40px] w-[40px] text-[18px]";
    case "lg":
      return "h-[50px] w-[50px] text-[30px]";
    default:
      return "h-[40px] w-[40px] text-[20px]";
  }
};

const getAcronym = (name: string): string => {
  const acronym = name
    .split(" ")
    .map((word) => {
      return word[0] ? word[0].toUpperCase() : "";
    })
    .join("");

  if (acronym.length > 2) return acronym.slice(0, 2);

  return acronym;
};