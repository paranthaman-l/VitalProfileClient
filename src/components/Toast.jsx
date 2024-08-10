import toast from "react-hot-toast"

export const SuccessToast = (data) => {
    toast.custom(
        <div>
            Hii
    </div>);
}
export const ErrorToast = (data) => {
    toast.error(data);
}
