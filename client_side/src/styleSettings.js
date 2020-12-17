import { Dimensions } from 'react-native';

export default {
    background: {
        backgroundColor: 'rgb(190, 247, 124)',
        paddingTop: 10,
        height: Dimensions.get("window").height,
    },
    contents: {
        flex: 1,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        padding: 0,
        borderStyle: 'solid',
        borderWidth: 1
    },
    buttonContainer: {
        backgroundColor: 'rgb(54, 125, 0)',
        borderRadius: 10,
        margin: 1,

    },
    lines: {
        marginEnd: 20
    },
    textInput: {
        marginEnd: 20,
        backgroundColor: 'rgb(173, 173, 173)',
        width: 50,
        paddingLeft: 5
    },
    courseInput: {
        width: Dimensions.get("window").width,
        height: 30,
        fontSize: 20,
        backgroundColor: 'rgb(173, 173, 173)',
        paddingLeft: 5
    },
    button: {
        backgroundColor: 'rgb(54, 125, 0)',
        color: 'rgb(54, 125, 0)'
    },
    map: {
        height: 269,
        width: 400
    }
}