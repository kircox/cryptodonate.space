import React from "react";
import { Text, Card, Container, Spacer } from "@nextui-org/react";
import { Flex } from "@adobe/react-spectrum";

interface TestDonateProps {
  visibility: string;
  value: any;
  valueTickets: any;
  confirmTickets: any;
}

export function TestDonate(props: TestDonateProps): JSX.Element {
  return (
    <>
      <>
        <Container
          css={{
            visibility: props.visibility,
          }}
        >
          <Container>
            <>
              <Container>
                <Card css={{ width: "fit-content" }}>
                  {/* <Text color='primary'>{doc.status}</Text> */}

                  <Flex direction={"row"}>
                    <Text
                      h1
                      css={{
                        marginRight: "$10",
                        textGradient: "0deg, $black -20%, $white 60%",
                      }}
                      weight="bold"
                    >
                      Username
                    </Text>
                    <Spacer />
                    <Text
                      h1
                      css={{
                        marginTop: "$",
                        textGradient: "45deg, #7FFF00 -20%, #7FFF00 50%",
                      }}
                      weight="bold"
                    >
                      $0{" "}
                    </Text>
                  </Flex>

                  {props.value.data().showMessage === true && (
                    <Text h2>Test donate</Text>
                  )}
                </Card>
              </Container>
            </>
          </Container>
        </Container>
      </>
    </>
  );
}

interface LastDonateProps {
  visibility: string;
  value: any;
  valueTickets: any;
  confirmTickets: any;
}

export function LastDonate(props: LastDonateProps): JSX.Element {
  // const [visibility, setVisibility] = useState("hidden");
  return (
    <>
      {props.value.data().alert === true && (
        <Container css={{ visibility: props.visibility }}>
          <Container>
            <>
              <Container>
                <Card css={{ width: "fit-content" }}>
                  {/* <Text color='primary'>{doc.status}</Text> */}
                  <Flex>
                    <Text
                      h1
                      css={{
                        marginRight: "$10",
                        textGradient: "0deg, $black -20%, $white 60%",
                      }}
                      weight="bold"
                    >
                      {
                        props.confirmTickets[props.confirmTickets.length - 1]
                          .name
                      }
                    </Text>
                    <Spacer />
                    <Text
                      h1
                      css={{
                        textGradient: "45deg, #7FFF00 -20%, #7FFF00 50%",
                      }}
                      weight="bold"
                    >
                      $
                      {
                        props.confirmTickets[props.confirmTickets.length - 1]
                          .usdAmount
                      }{" "}
                    </Text>
                  </Flex>

                  {props.value.data().showMessage === true && (
                    <Text h2>
                      {
                        props.confirmTickets[props.confirmTickets.length - 1]
                          .msg
                      }
                    </Text>
                  )}
                </Card>
              </Container>
            </>
          </Container>
        </Container>
      )}
    </>
  );
}
