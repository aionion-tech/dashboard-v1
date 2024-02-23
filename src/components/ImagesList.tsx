import { ImageItem } from "@/types/ImageItem.interface";

interface Props {
  imageItemsState: Record<string, ImageItem>;
}
export const ImagesList = ({ imageItemsState }: Props) => {
  return (
    <div className="flex-1">
      {Object.values(imageItemsState).map((imageItem, index) => {
        return (
          <div key={imageItem.imagePreview} className="flex mb-4">
            <img
              src={imageItem.imagePreview}
              alt=""
              className={`h-[100px] min-w-[100px] object-cover mr-4 ${
                imageItem.status === "success" ? "opacity-100" : "opacity-50"
              }`}
            />
            <div>
              <p>{imageItem.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
