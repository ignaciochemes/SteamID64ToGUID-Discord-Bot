class TextConstants {
    static UID_NO_ARGS = `Insert account id64 | -uid <your id64 here> | -uid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/`;
    static UID_MENOR_ARGS = `The entered arguments are wrong or not complete. Please check the data. \nIf you have any questions, just enter the uid comman. | -uid <your id64 here> | -uid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/`;
    static GUID_NO_ARGS = 'Insert account id64 | -guid <your id64 here> | -guid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/';
    static GUID_MENOR_ARGS = 'The entered arguments are wrong or not complete. Please check the data. \nIf you have any questions, just enter the uid comman. | -guid <your id64 here> | -guid 765611981... \nIf you dont have your steam id 64 number, please execute the following command\n\`-steam <your-steam-profile-link>\`\nExample -steam https://steamcommunity.com/id/siegmundsensi/';
    static SETPREFIX_NO_ARGS = 'You must provide a **new prefix**!';
    static SETPREFIX_MAYOR_ARGS = 'Your new prefix must be under \`5\` characters!';
    static SETDAYZ_NO_ARGS = 'You must provide your **Dayz Server IP**. Eg: \`-setdayzserver 0.0.0.0\` and press enter.';
    static SETDAYZ_MAYOR_ARGS = 'Your new ip must be under \`15\` characters!';
    static SETARMA_NO_ARGS = 'You must provide your **Arma 3 Server IP**. Eg: \`-setarma3server 0.0.0.0\` and press enter.';
    static SETARMA_MAYOR_ARGS = 'Your new ip must be under \`15\` characters!';
    static ID64_NO_ARGS = 'Insert account url | -steam <your steam account url here>';
    static ARMA_NO_USER_IP = 'No ip related to your discord profile.id was found. Please enter the following command to configure one. \`-setarma3server\`.';
    static DAYZ_NO_USER_IP = 'No ip related to your discord profile.id was found. Please enter the following command to configure one. \`-setdayzserver\`.';

    static QUERY_PORT = 'Now I need you to put the QUERY port of the server to trace. Write the number and press ENTER \nThis message will be deleted in a minute.';
    static NO_QUERY_PORT = 'You didnt enter the QUERY port. You have to start the operation again!';
    static CANCEL = 'Operation canceled!';
    static DB_SORT_ERROR = 'No se pudo sortear la base';
}

module.exports = { TextConstants }