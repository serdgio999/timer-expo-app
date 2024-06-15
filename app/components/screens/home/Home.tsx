import { FC } from 'react';

import Layout from '@/components/ui/layout/Layout';
import Timer from './Timer';

const Home: FC = () => {
	return (
		<Layout title='Timer'>
			<Timer />
		</Layout>
	);
};

export default Home;
