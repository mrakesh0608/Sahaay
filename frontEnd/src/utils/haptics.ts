import * as Haptics from 'expo-haptics';

export function capitalize(text = '') {
    if(text){
        text = text.toLowerCase();
        if (text.length) return text[0].toString().toUpperCase() + text.slice(1);
        else return text;
    }
    else return '';
}

export function haptics(type) {

    type = capitalize(type);

    if (['Light', 'Medium', 'Heavy'].includes(type)) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle[type])
    }
    else if (['Success', 'Error', 'Warning'].includes(type)) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType[type])
    }
    else Haptics.selectionAsync()
}