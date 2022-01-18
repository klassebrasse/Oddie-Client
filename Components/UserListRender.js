import {Avatar, ListItem} from "react-native-elements";

const UserListRender = ({ item }) => (
    <ListItem bottomDivider >
        <Avatar title={item.name[0]} source={item.avatar_url && { uri: item.avatar_url }}/>
        <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
    </ListItem>
)

export default UserListRender;