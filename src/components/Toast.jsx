import toast from "react-hot-toast"

export const SuccessToast = (data) => {
    toast.success(data);
}
export const ErrorToast = (data) => {
    toast.error(data);
}
