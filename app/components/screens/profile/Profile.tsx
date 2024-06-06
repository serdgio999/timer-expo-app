import { FC } from 'react';

import Layout from '@/components/ui/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/common/Button';

const Profile: FC = () => {
	const { setUser } = useAuth();

	return (
		<Layout title='Profile'>
			<Button onPress={() => setUser(null)}>Logout</Button>
		</Layout>
	);
};

export default Profile;
