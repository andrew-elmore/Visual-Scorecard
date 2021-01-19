import { Dimensions } from 'react-native';

const contentWidth = Dimensions.get("window").width/5

export default {
    background: {
        backgroundColor: 'lightgrey',
        paddingTop: 10,
        height: Dimensions.get("window").height,
    },
    contents: {
        flex: 1,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        padding: 0,
        borderStyle: 'solid',
        borderWidth: 1,
    },
    totalScore: {
        backgroundColor: 'lightgrey',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonContainer: {
        backgroundColor: 'rgb(54, 125, 0)',
        borderRadius: 10,
        margin: 1,
    },
    shadowButtonContainer: {
        backgroundColor: 'rgb(54, 125, 0)',
        borderRadius: 10,
        margin: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 16.00,

        elevation: 24,
    },

    inputShadow: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        margin: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 16.00,

        elevation: 24,
        
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
    },

    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 16.00,

        elevation: 24,

    },
    hole: { minWidth: contentWidth, maxWidth: contentWidth, borderLeftColor: "grey", borderLeftWidth: 1, paddingLeft: 10},
    par: { minWidth: contentWidth, maxWidth: contentWidth, borderLeftColor: "grey", borderLeftWidth: 1, paddingLeft: 10},
    yards: { minWidth: contentWidth, maxWidth: contentWidth, borderLeftColor: "grey", borderLeftWidth: 1, paddingLeft: 10},
    score: { minWidth: contentWidth, maxWidth: contentWidth, borderLeftColor: "grey", borderLeftWidth: 1, paddingLeft: 10},
    overUnder: { minWidth: contentWidth, maxWidth: contentWidth, borderLeftColor: "grey", borderLeftWidth: 1, paddingLeft: 10},
    
}

