

export const AI_Image_API_Key = '';

export const secretKey = 'my_Super_Secret_Key_Here_Must_Not_Be_123, Or, Else';

export const tokenGlobal ="";
export const STATUS_CONFIG = {
    Pending: {
        emoji: "⏳",
        color: "#FFD700",
        border: 2,
        animation: "pulse",
    },
    Processing: {
        emoji: "🔥",
        color: "#FFA500",
        border: 3,
        animation: "shake",
    },
    Enroute: {
        emoji: "🚚",
        color: "#2ECC71",
        border: 3,
        animation: "bounce",
    },
    Delivered: {
        emoji: "🎉",
        color: "#3498DB",
        border: 2,
        animation: "tada",
    },
};

//export const BaseURL = 'http://192.168.161.15:5151/Api';
 const url ="192.168.100.36";
export const BaseURL = `http://${url}:5151/Api`;
