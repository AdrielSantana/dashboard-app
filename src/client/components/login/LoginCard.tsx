"use client";

import useColors from "@/client/assets/useColors";
import Options from "@/client/components/layout/profile/Options";
import Logo from "@/client/components/layout/sidebar/Logo";
import useAuth, { LoginParamProps } from "@/client/services/useAuth";
import useUserStore from "@/client/state/useUserStore";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Card,
  CardBody,
  CardHeader,
  Heading,
  CardFooter,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

const LoginCard = () => {
  const { cardBgColor, colors } = useColors();

  const [passwordView, setPasswordView] = useState<boolean>(false);
  const { user } = useUserStore();
  const { failedLogin, login } = useAuth();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const handleSubmitLogin: SubmitHandler<LoginParamProps> = (data) => {
    login(data);
  };

  useEffect(() => {
    if (!!user) {
      router.push("/dashboard");
    }
  }, [user, router]);
  return (
    <Card p={8} bgColor={cardBgColor} mx={5} w={"500px"}>
      <CardHeader as={Flex} justifyContent={"center"}>
        <Logo />
      </CardHeader>
      <form onSubmit={handleSubmit(handleSubmitLogin)}>
        <CardBody
          as={Flex}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={8}
        >
          <Heading size={"lg"}>Login</Heading>

          <FormControl
            isRequired={errors.email ? true : false}
            isInvalid={errors.email ? true : false}
          >
            <FormLabel>Email</FormLabel>

            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  variant={"filled"}
                  type={"email"}
                  placeholder="Seu Email"
                />
              )}
            />

            {errors.email ? (
              <FormErrorMessage>Email não pode ser vazio</FormErrorMessage>
            ) : (
              <FormHelperText>Insira o Email</FormHelperText>
            )}
          </FormControl>

          <FormControl
            isRequired={errors.password ? true : false}
            isInvalid={errors.password ? true : false}
          >
            <FormLabel>Senha</FormLabel>

            <InputGroup>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant={"filled"}
                    type={passwordView ? "text" : "password"}
                    placeholder="Sua Senha"
                  />
                )}
              />
              <InputRightElement>
                <IconButton
                  aria-label="toogle-password"
                  icon={
                    !passwordView ? (
                      <ViewIcon color={colors.primary} />
                    ) : (
                      <ViewOffIcon color={colors.primary} />
                    )
                  }
                  variant={"ghost"}
                  onClick={(e) => setPasswordView(!passwordView)}
                />
              </InputRightElement>
            </InputGroup>

            {errors.password ? (
              <FormErrorMessage>Senha não pode ser vazia</FormErrorMessage>
            ) : (
              <FormHelperText>Insira a Senha</FormHelperText>
            )}
          </FormControl>

          <Button type="submit" colorScheme={"teal"}>
            Entrar
          </Button>
          {failedLogin ? (
            <Text color={"red.400"}>Email ou Senha inválidos</Text>
          ) : (
            <></>
          )}
        </CardBody>
      </form>
      <CardFooter as={Flex} justifyContent={"center"}>
        <Options isLogin />
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
