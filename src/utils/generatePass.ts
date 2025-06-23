
export const generateRandomPassword = async (length = 12, email: string): Promise<string> => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={}[\]|;:,<.>/?' +
        '`~';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
        newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return newPassword;
};