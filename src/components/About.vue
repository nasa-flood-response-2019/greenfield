<template>

        <v-sheet id="aboutSheet"
                 color="light-blue lighten-4"
                 height="600"
                 width="1200"

        >
            <v-container
                    id="scroll-target"
                    style="max-height: 550px"
                    class="scroll-y"
            >
<!--                style height in above tag changes height of text within the container-->
                <v-layout

                        column
                        align-center
                        justify-top
                        style="height: 500px"
                >
<!--                    changes height of the scroll-->
<!--                use the v-layout when enough information is in there to use a scroll-->
                    <div id="words">
                        <h1>NASA SEES Flood Response Team: About Page</h1>
                            <v-divider></v-divider>
                        <p></p>
                        <h3>Anavi Nayak</h3>
                        <p>Anavi Nayak ('21)  is a student at Westwood High School in Austin, TX. Her interest in computer science grew in middle school when she participated in the ProjectCSGIRLS technology competition. As an advocate for women in technology, she is the Vice President of CodeGirls, a school club dedicated to promoting equality in technology, and works in the National Programs Team of ProjectCSGIRLS, a global nonprofit. She also volunteers at ConnectED, a program teaching elementary school kids to code. After learning Java, she participated on her high school's Computer Science UIL team and has won the Texas SkillsUSA Team Web Design competition. During the SEES internship, she expanded her web design skills by learning to use APIs and frameworks. In her free time, she plays with her dog and binge watches “Friends.”</p>
                        <h3>Haley Sanchez</h3>
                        <p>Haley Sanchez is a Junior at Steinbrenner High School in Tampa, Florida, who aspires to become a computer scientist. She is the president of Science NHS club at her school, is a part of the VEX robotics team and competes in coding competitions like CodeQuest at Lockheed Martin. By being a ‘Code Sensei’ at Code Ninjas, she is able to share her love of programming with the next generation. Haley is also the historian of her school’s FBLA chapter and is an active member in both the Math honor society and the National honor society chapters in her school. Besides coding, Haley has done competitive cheerleading for 8 years. In her free time, she enjoys to spending time with family and catching up on sleep.</p>
                        <h3>Caroline Choi</h3>
                        <p>Caroline is a rising senior from Alameda, an island located across the bay from San Francisco. You can find Caroline listening to the podcast ‘Planet Money’, watching ‘Veep’ on HBO or fencing (Caroline is the team captain and assistant coach at her fencing club!). Caroline is super passionate about the environment and has received awards for her work in combating the climate crisis. As part of the non-profit CASA, she tackles government policies and encourages everything from reusable boba tea containers to compost bins. Caroline's other love is computer science – she's a writer for the open-source coding website Alligator.io and has worked on projects with UC Berkeley SWE and the NCWIT, #BuiltByGirls and Kode With Klossy communities.</p>
                        <h3>Mihir Shah</h3>
                        <p>Mihir goes to Westwood High School in Austin, TX and will be a 12th grader. He likes to code and do math competitions and wants to do EECS major in college.</p>
                        <h3>Brent Porter</h3>
                        <p>With almost 40 years programming experience, Brent Porter enjoys mentoring students with research and application development. As a geospatial programmer, he has worked emergency response events for 20 years, including work on the Columbia Shuttle accident, Deepwater Horizon Oil Disaster, and Hurricane Katrina and Hurricane Harvey. He also works extensively in application architecture and system architecture to build and maintain robust Emergency Response GIS support infrastructure.</p>
                    </div>
                </v-layout>
            </v-container>
        </v-sheet>
    
</template>

<script>
    export default {
        name: "About",
        components: {
            SheetFooter: {
                functional: true,

                render(h, {children}) {
                    return h('v-sheet', {
                        staticClass: 'mt-auto align-center justify-center d-flex',
                        props: {
                            color: 'rgba(0, 0, 0, .36)',
                            dark: true,
                            height: 200,
                            width: 100
                        }
                    }, children)
                }
            }
        },
            created()
            {
                this.$eventHub.$on('openAbout', this.aboutOpen);
            },
            methods:
                {
                    aboutOpen: function () {
                        //console.log('about working');
                        //toggle visibility for 3Dscene
                        //not working lol
                        let about = document.getElementById("aboutSheet");
                        if (about.style.display === "none") {
                            about.style.display = "block";
                        } else {
                            about.style.display = "none";
                        }
                    }
                }

    }
</script>

<style scoped>
    #aboutSheet{
        position: absolute;
        bottom: 11%;
        top: 13%;
        left: 7%;
        z-index: 1009;
    }

    #words{
        z-index: 3000;
    }
</style>