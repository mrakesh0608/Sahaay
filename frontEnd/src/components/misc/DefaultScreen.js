import { ScrollView } from 'react-native';

//use this component where no flatlist is required
export function DefaultScreen(props) {
    return (
        <ScrollView contentContainerStyle={{
            padding: 20
        }}>
            {props.children}
        </ScrollView>
    );
}