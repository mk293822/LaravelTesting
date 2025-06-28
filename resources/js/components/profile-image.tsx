import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Input } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import InputError from './input-error';
import { Button, buttonVariants } from './ui/button';

type ProfileForm = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    bio: string | undefined;
};

const ProfileImage = ({ data, user }: { data: ProfileForm; user: User }) => {
    const getInitials = useInitials();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const cropperRef = useRef<ReactCropperElement>(null);
    const [imageCrop, setImageCrop] = useState<string | undefined>();
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const {
        setData: setPhoto,
        post,
        errors: photo_errors,
        processing: photo_processing,
        delete: deletePhoto,
    } = useForm<Required<{ profile_photo: Blob | undefined }>>({
        profile_photo: undefined,
    });

    const deleteProfileImage = () => {
        setPhoto('profile_photo', undefined);
        setCroppedImage(null);
        deletePhoto(route('profile.photo_delete'), { preserveScroll: true });
    };

    const uploadProfileImage = () => {
        setPhoto('profile_photo', undefined);
        setCroppedImage(null);
        post(route('profile.photo'), { preserveScroll: true, forceFormData: true });
    };

    const onCrop = async () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const blob = await new Promise<Blob>((resolve, reject) => {
                cropper.getCroppedCanvas().toBlob((blob) => {
                    if (blob) resolve(blob);
                    else {
                        reject(new Error('Failed to create blob from canvas.'));
                    }
                }, 'image/jpeg');
            });
            setPhoto('profile_photo', blob);
            const croppedCanvas = cropper.getCroppedCanvas();
            setCroppedImage(croppedCanvas.toDataURL());
            setImageCrop(undefined);
        }
    };

    return (
        <>
            <div className="relative flex items-center justify-center">
                <Avatar className="h-36 w-36 hover:cursor-pointer" onClick={() => imageInputRef?.current?.click()}>
                    <AvatarImage src={croppedImage ?? user.profile_photo_url} alt={data.username} />
                    <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(data.first_name + ' ' + data.last_name)}
                    </AvatarFallback>
                </Avatar>

                <Input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    hidden
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setImageCrop(URL.createObjectURL(file));
                        }
                    }}
                />

                <InputError className="mt-2" message={photo_errors.profile_photo} />
            </div>

            <div className="flex flex-row items-center justify-end gap-2">
                {croppedImage && (
                    <Button disabled={photo_processing} onClick={uploadProfileImage} className={cn(buttonVariants({ variant: 'default' }), 'm-0')}>
                        Upload
                    </Button>
                )}
                {user.profile_photo_url && (
                    <Button
                        disabled={photo_processing}
                        onClick={deleteProfileImage}
                        className={cn(buttonVariants({ variant: 'destructive' }), 'm-0')}
                    >
                        Delete Image
                    </Button>
                )}
            </div>

            {imageCrop && (
                <div className="fixed top-4 mx-auto">
                    <div className="relative">
                        <button onClick={() => setImageCrop(undefined)} className="absolute top-2 right-2 rounded-full p-2 hover:bg-black/20">
                            <X size={20} />
                        </button>
                        <Cropper
                            ref={cropperRef}
                            src={imageCrop}
                            style={{ height: '95vh', width: '100%' }}
                            // Cropper.js options:
                            aspectRatio={1}
                            guides={true}
                            viewMode={1}
                            zoomable={true}
                            scalable={true}
                            cropBoxResizable={true}
                        />
                        <Button onClick={onCrop} className={cn(buttonVariants({ variant: 'destructive' }), 'absolute right-0 bottom-0 w-28')}>
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileImage;
