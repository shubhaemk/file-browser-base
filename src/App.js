import {Provider} from 'react-redux';
import { store } from './store';
import { Layout } from 'antd'

import Navbar from './components/Navbar'
import ActionBar from './components/ActionBar'
import FolderData from './components/FolderData';


function App() {

    const { Content } = Layout

    return (
        <Provider store={store}>
            <Layout>
                <Navbar/>
                <Content>
                    <ActionBar />
                    <FolderData />
                </Content>
            </Layout>
        </Provider>
    )
}


export default App;
