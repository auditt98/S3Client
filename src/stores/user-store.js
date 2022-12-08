import { atom, selector } from 'recoil';

const currentUserState = atom({
	key: 'currentUser',
	default: {},
});

const currentRegionList = atom({
	key: 'currentRegions',
	default: [],
});

export { currentUserState, currentRegionList };
