import { FC } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import cn from 'clsx';

import { IAuthFormData } from '@/types/auth.interface';

const AuthFields: FC<{ control: Control<IAuthFormData> }> = ({ control }) => {
	return (
		<>
			<Controller
				control={control}
				name='email'
				rules={{
					required: 'Email is required'
					// pattern: {
					// 	value: '// regExp',
					// 	message: 'Email is invalid'
					// }
				}}
				render={({ field, fieldState }) => (
					<>
						<View
							className={cn(
								'rounded bg-inputField border pb-4 pt-2.5 px-4 my-2',
								Boolean(fieldState.error)
									? 'border-red-500'
									: 'border-transparent'
							)}
						>
							<TextInput
								placeholder='Enter email'
								placeholderTextColor='#999'
								value={field.value}
								onChangeText={field.onChange}
								onBlur={field.onBlur}
								autoCapitalize='none'
								autoComplete='off'
								className='text-white text-lg'
							/>
						</View>
						{fieldState.error && (
							<Text className='text-red-500'>{fieldState.error.message}</Text>
						)}
					</>
				)}
			/>
			<Controller
				control={control}
				name='password'
				rules={{
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Password should be at least 6 characters'
					}
				}}
				render={({ field, fieldState }) => (
					<>
						<View
							className={cn(
								'rounded bg-inputField border pb-4 pt-2.5 px-4 my-2',
								Boolean(fieldState.error)
									? 'border-red-500'
									: 'border-transparent'
							)}
						>
							<TextInput
								placeholder='Enter password'
								placeholderTextColor='#999'
								value={field.value}
								onChangeText={field.onChange}
								onBlur={field.onBlur}
								autoCapitalize='none'
								className='text-white text-lg'
								secureTextEntry={true}
							/>
						</View>
						{fieldState.error && (
							<Text className='text-red-500'>{fieldState.error.message}</Text>
						)}
					</>
				)}
			/>
		</>
	);
};

export default AuthFields;
