import { atom, selector } from 'recoil';

const currentUser = atom({
	key: 'currentUser',
	default: null,
});

export { currentUser };
