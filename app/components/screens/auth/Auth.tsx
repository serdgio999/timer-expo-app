import { FC, useState } from 'react';
import {
	Keyboard,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { IAuthFormData } from '@/types/auth.interface';
import { useAuth } from '@/hooks/useAuth';

import AuthFields from './AuthFields';
import Button from '@/components/ui/common/Button';
import Loader from '@/components/ui/common/Loader';

const Auth: FC = () => {
	const { setUser } = useAuth();
	const { control, reset, handleSubmit } = useForm<IAuthFormData>({
		mode: 'onChange'
	});
	const [isRegistrationScreen, setIsRegistrationScreen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		setUser({
			_id: '',
			...data
		});

		reset();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View className='items-center justify-center flex-1'>
				<View className='w-3/4'>
					<Text className='text-white text-4xl font-bold text-center mb-5'>
						{isRegistrationScreen ? 'Sign Up' : 'Sign In'}
					</Text>

					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} />
							<Button onPress={handleSubmit(onSubmit)}>Submit</Button>
							<Pressable
								className='w-16 self-end'
								onPress={() => setIsRegistrationScreen(!isRegistrationScreen)}
							>
								<Text className='text-opacity-60 text-white text-base mt-3'>
									{isRegistrationScreen ? 'Sign In' : 'Sign Up'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Auth;
