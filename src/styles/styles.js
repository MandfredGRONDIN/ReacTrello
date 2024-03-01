import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        width: 300,
        height: 50,
        padding: 3,
        marginVertical: 5
    },
    btn: {
        borderRadius: 5,
        marginVertical: 5,
        paddingHorizontal: 50,
        paddingVertical: 10,
        backgroundColor: "#3474eb"
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14
    },
    titre: {
        fontWeight: "bold",
        fontSize: 24
    },
    longCard: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
        width: 300,
        height: 50,
        padding: 3,
        marginVertical: 5
    }
})