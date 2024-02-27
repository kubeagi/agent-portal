import AccountClient from './AccountClient';
import BtnList from './BtnList';
import BtnsBlock from './BtnsBlock';
import Chats from './Chats';
import Conversation from './Conversation';
import DataControlClient from './DataControlClient';
import SideBar from './SideBar';
import SideBarHeader from './SideBarHeader';
import UserInfoClient from './UserInfoClient';
import app from './app';
import callback from './callback';
import components from './components';
import create from './create';
import inner from './inner';
import oidc from './oidc';
import setting from './setting';
import utils from './utils';

export default Object.assign(
  {},
  {
    components,
    create,
    Conversation,
    app,
    callback,
    oidc,
    AccountClient,
    DataControlClient,
    setting,
    BtnList,
    UserInfoClient,
    inner,
    BtnsBlock,
    Chats,
    SideBar,
    SideBarHeader,
    utils,
  }
);
