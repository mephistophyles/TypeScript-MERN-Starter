import React from "react";
import { Root } from "native-base";
import { NativeRouter } from "react-router-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import Routes from "./src/Routes";
import store from "./core/src/shared/store";
import { initToast } from "./core/src/shared/toast";
import toastWrapper from "./src/utils/Toast";
import { initStorage } from "./core/src/shared/storage";
import { AsyncStorage } from "react-native";
interface Props {}
interface States {
    isReady: boolean;
}

export default class App extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        // initialize toast provider using Toast from NativeBase
        initToast(toastWrapper);
        // initialize local storage provider
        initStorage(AsyncStorage);
        this.state = {
            isReady: false,
        };
    }

    async componentDidMount() {
        // Load font resources for NativeBase
        await Font.loadAsync({
            Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ isReady: true });
    }
    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        } else {
            return <Root>
                <Provider store={store}>
                    <NativeRouter>
                        <Routes />
                    </NativeRouter>
                </Provider>
            </Root>;
        }
    }
}